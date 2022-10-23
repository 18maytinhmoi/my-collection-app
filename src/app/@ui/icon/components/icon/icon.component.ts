import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { PadIconRegistry } from '@ui/icon/registry';
import {
  DEFAULT_CONFIG,
  GroupIconSizePropertyName,
  PadIconConfig,
  PAD_ICON_CONFIG,
} from '@ui/icon/type';

@Component({
  selector: 'pad-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PadIconComponent implements OnChanges {
  @Input() key!: string;
  @Input() size: GroupIconSizePropertyName = GroupIconSizePropertyName.md;
  @Input() strokeWidth!: string | number;
  @Input() width!: string | number;
  @Input() height!: string | number;

  private _init: boolean;
  private _config: PadIconConfig;

  svgIcon$!: Observable<SVGElement>;

  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _registry: PadIconRegistry,
    @Inject(PAD_ICON_CONFIG) customConfig: PadIconConfig
  ) {
    this._init = true;
    this._config = { ...DEFAULT_CONFIG, ...customConfig };
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { key, size, width, height } = changes;
    if (key) {
      this.svgIcon$ = this._setSvgIcon(key.currentValue);
    }

    if (size) {
      this._setIconSize(size.currentValue);
    }

    if (this._init && !size?.currentValue) {
      this._setIconSize(DEFAULT_CONFIG.defaultSize);
    }

    this._init = false;
  }

  private _setSvgIcon(key: string) {
    return this._registry.get(key).pipe(
      map(svgElement => this._setSvgElementAttribute(svgElement)),
      map(svgElement => svgElement.cloneNode(true) as SVGElement),
      tap(cloneElement => {
        this.element.innerHTML = '';
        this.element.appendChild(cloneElement);
      })
    );
  }

  private _setSvgElementAttribute(svgElement: SVGElement) {
    if (this.strokeWidth) {
      svgElement.style.strokeWidth = this._coerceCssPixelValue(
        this.strokeWidth
      );
    }
    return svgElement;
  }

  private _setIconSize(size: GroupIconSizePropertyName) {
    const value = this._coerceCssPixelValue(this._config.sizes[size]);
    this.element.style.width = value;
    this.element.style.height = value;
  }

  private _coerceCssPixelValue(value: number | string) {
    if (value == null) {
      return '';
    }
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  }
}
