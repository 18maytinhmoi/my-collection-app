// enum SafeDecoratorLogLevel {
//   Console = 'Console',
//   Sentry = 'Sentry',
//   Default = 'Console',
// }
// // export function Safe(params: any = {}): MethodDecorator {
// //   return (target, propertyKey, descriptor) => {
// //     const originalMethod = descriptor.value;
// //     const logLevel = params.logLevel || SafeDecoratorLogLevel.Default;
// //     descriptor.value = function SafeWrapper() {
// //       try {
// //         return originalMethod?.apply(this, arguments);
// //       } catch (error) {}
// //     };
// //   };
// // }

// export function Safe<T>(params: SafeDecoratorParams<T> = {}): Function {
//   return function (
//     target: object,
//     propertyKey: string,
//     descriptor: TypedPropertyDescriptor<Function>
//   ): TypedPropertyDescriptor<Function> {
//     const originalMethod = descriptor.value;
//     const logLevel = params.logLevel || SafeDecoratorLogLevel.Default;
//     descriptor.value = function SafeWrapper(): SafeDecoratorParams<T> | false {
//       try {
//         return originalMethod.apply(this, arguments);
//       } catch (error) {
//         if (logLevel === SafeDecoratorLogLevel.Console) {
//           console.error(error);
//         }
//         if (logLevel === SafeDecoratorLogLevel.Sentry) {
//           if (!this.errorHandler) {
//             throw new Error(
//               "Class with 'Safe' decorator and logLevel 2 should have 'errorHandler' class property with 'ErrorHandler' class."
//             );
//           } else {
//             this.errorHandler.handleError(error);
//           }
//         }
//         return params.returnValue !== undefined ? params.returnValue : false;
//       }
//     };
//     return descriptor;
//   };
// }

// export function Test(params: any = {}): Function{
//   return (
//     target: Object,
//     propertyKey: string | Symbol,
//     descriptor: TypedPropertyDescriptor<Function>
//   ) => {
//     const originalMethod = descriptor.value;
//     const logLevel = params.logLevel || SafeDecoratorLogLevel.Default;
//     descriptor.value = function SafeWrapper(...args: any[]) {
//       try {
//         return originalMethod.apply(this, args);
//       } catch (error) {
//         if (logLevel === SafeDecoratorLogLevel.Console) {
//           console.error(error);
//         }
//         if (logLevel === SafeDecoratorLogLevel.Sentry) {
//           if(this.)
//         }
//       }
//     };

//     return descriptor;
//   };
// }
