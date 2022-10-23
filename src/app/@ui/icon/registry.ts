import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { catchError, map, Observable, of, take, tap, throwError } from 'rxjs';
import { DEFAULT_CONFIG, PadIconConfig, PAD_ICON_CONFIG } from './type';

@Injectable({ providedIn: 'root' })
export class PadIconRegistry {
  private _icons: Map<string, SVGElement>;
  private _path: string;

  constructor(
    @Optional() @Inject(DOCUMENT) private readonly _document: Document,
    @Optional() private readonly _http: HttpClient,
    @Inject(PAD_ICON_CONFIG) customConfig: PadIconConfig
  ) {
    this._icons = new Map<string, SVGElement>();
    this._path = customConfig.path ?? DEFAULT_CONFIG.path;
  }

  get(key: string): Observable<SVGElement> {
    const icon = this._icons.get(key);
    if (icon) {
      return of(icon).pipe(take(1));
    }
    return this._getIconFromSvgFileAndRegistry(key);
  }

  private _getIconFromSvgFileAndRegistry(key: string): Observable<SVGElement> {
    return this._loadContentFromSvgFile(key).pipe(
      map(content => this._svgElementFromString(content)),
      map(svgElement => this._setSvgElementAttributes(svgElement)),
      tap(svgElement => this._icons.set(key, svgElement)),
      tap(() => console.log(this._icons)),
      catchError((error: HttpErrorResponse) => {
        const url = '';
        const message = `Loading icon set URL: ${url} failed: ${error.message}`;
        return throwError(() => Error());
      })
    );
  }

  private _loadContentFromSvgFile(key: string): Observable<string> {
    const fileName = this._nameSvgFileFromKey(key);
    const url = this._path + fileName;
    return this._http.get(url, { responseType: 'text' });
  }

  private _nameSvgFileFromKey(key: string): string {
    return key + '.svg';
  }

  private _svgElementFromString(content: string) {
    const wrapperElement = this._document.createElement('DIV');
    wrapperElement.innerHTML = content;
    const svgElement = wrapperElement.querySelector('svg') as SVGElement;

    if (!svgElement) {
      throw new Error('<svg> tag not found');
    }
    return svgElement;
  }

  private _setSvgElementAttributes(svgElement: SVGElement): SVGElement {
    svgElement.setAttribute('fit', '');
    svgElement.setAttribute('height', '100%');
    svgElement.setAttribute('width', '100%');

    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgElement.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.

    return svgElement;
  }
}
