import { environment } from 'src/environments/environment';

export function NgLog(): ClassDecorator {
  return target => {
    if (!environment.production) {
      const LIFECYCLE_HOOKS = ['ngOnInit', 'ngOnChanges', 'ngOnDestroy'];
      const name = target.name;
      LIFECYCLE_HOOKS.forEach(hook => {
        const original = target.prototype[hook];
        target.prototype[hook] = function (...args: any[]) {
          console.log(
            `%c ${name} - ${hook}`,
            `color: #4CAF50; font-weight: bold`,
            ...args
          );
          original && original.apply(this, args);
        };
      });
    }
  };
}
