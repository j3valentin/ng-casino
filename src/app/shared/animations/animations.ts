import { animate, group, state, style, transition, trigger } from '@angular/animations';

export const TransitionAnimation = [
  trigger('slideDown', [
    transition(':enter', [
      style({
        height: '0px',
      }),
      animate(
        '400ms ease-in',
        style({
          height: '54px',
        }),
      ),
    ]),
  ]),
];

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        'max-height': '700px',
        opacity: '1',
        visibility: 'visible',
      }),
    ),
    transition('out => in', [
      group([
        animate(
          '600ms ease-in-out',
          style({
            height: '650px',
          }),
        ),
      ]),
    ]),
  ]),
];

export const InOutAnimation = [
  trigger('inOutAnimation', [
    transition(':enter', [style({ opacity: 0 }), animate('200ms ease-out', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('1000ms ease-in', style({ opacity: 0 }))]),
  ]),
];
