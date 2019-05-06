import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from "@angular/animations";

export const routerAnimation =
  trigger('routerAnimation', [
    transition('* => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '100%' })
      ], { optional: true }),
      group([
        query('.container-left :leave', [
          animate('300ms ease-out', style({ left: '-100%' }))
        ], { optional: true }),
        query('.container-left :enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('.container-right :leave', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('.container-right :enter', [
          animate('300ms ease-out', style({ left: '0%', zIndex: 99 }))
        ], { optional: true })
      ])
    ])
  ]);
  