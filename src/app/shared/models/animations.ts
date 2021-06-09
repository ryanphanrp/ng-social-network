import {animate, animation, keyframes, style, transition, trigger, useAnimation} from '@angular/animations';

/*
*   Enum for Animations
* */


/*
*   Animations
* */
// Scale
export const scaleIn = animation([
  style({opacity: 0, transform: 'scale(0.5)'}), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({opacity: 1, transform: 'scale(1)'})
  )
]);

export const scaleOut = animation([
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({opacity: 0, transform: 'scale(0.5)'})
  )
]);

// Fade
export const fadeIn = animation([
  style({opacity: 0}), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({opacity: 1})
  )
]);

export const fadeOut = animation([
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({opacity: 0})
  )
]);

// Flip
export const flipIn = animation([
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    keyframes([
      style({
        opacity: 1,
        transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
        offset: 0
      }), // start state
      style({transform: 'perspective(400px)', offset: 1})
    ])
  )
]);

export const flipOut = animation([
  // just hide it
]);

// Jack in the Box
export const jackIn = animation([
  animate(
    '{{time}} ease-in',
    keyframes([
      style({
        animationFillMode: 'forwards',
        transform: 'scale(0.1) rotate(30deg)',
        transformOrigin: 'center bottom',
        offset: 0
      }),
      style({
        transform: 'rotate(-10deg)',
        offset: 0.5
      }),
      style({
        transform: 'rotate(3deg)',
        offset: 0.7
      }),
      style({
        transform: 'perspective(400px)',
        offset: 1
      })
    ])
  )
]);

export const jackOut = animation([
  // just hide it
]);

// Translate X
export const translateXIn = animation([
  style({ opacity: 0, transform: 'translateX(10px)' }),
  animate('500ms', style({ opacity: 1, transform: 'translateX(0)' })),
]);

export const translateXOut = animation([
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 0, transform: 'translateX(10px)' })
  )
]);


/*
*   Specified animations for component
* */
export const slideAnimation = [
  trigger('slideAnimation', [
    /* scale */
    transition('void => scale', [
      useAnimation(scaleIn, {params: {time: '500ms'}})
    ]),
    transition('scale => void', [
      useAnimation(scaleOut, {params: {time: '500ms'}})
    ]),

    /* fade */
    transition('void => fade', [
      useAnimation(fadeIn, {params: {time: '500ms'}})
    ]),
    transition('fade => void', [
      useAnimation(fadeOut, {params: {time: '500ms'}})
    ]),

    /* flip */
    transition('void => flip', [
      useAnimation(flipIn, {params: {time: '500ms'}})
    ]),
    transition('flip => void', [
      useAnimation(flipOut, {params: {time: '500ms'}})
    ]),

    /* JackInTheBox */
    transition('void => jackInTheBox', [
      useAnimation(jackIn, {params: {time: '700ms'}})
    ]),
    transition('jackInTheBox => void', [
      useAnimation(jackOut, {params: {time: '700ms'}})
    ])
  ])
];


/*
*  Enter Animation
* */

export const enterAnimations = [
  trigger(
    'enterAnimation', [
      transition(':enter', [
        useAnimation(translateXIn, {params: {time: '500ms'}})]),
      transition(':leave', [
        useAnimation(translateXOut, {params: {time: '500ms'}})])
    ]
  )
];
