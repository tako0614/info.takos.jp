import { Component, JSX } from 'solid-js';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement> & { title?: string };

export const GitHubIcon: Component<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={props.title ? undefined : true}
    {...props}
  >
    {props.title ? <title>{props.title}</title> : null}
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.4-5.29 5.69.42.36.79 1.08.79 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
  </svg>
);

export const XLogo: Component<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden={props.title ? undefined : true}
    {...props}
  >
    {props.title ? <title>{props.title}</title> : null}
    {/* Two stylized diagonal strokes to resemble the modern X logo */}
    <path d="M18.5 5.5c-1.6 2.6-6.6 7.2-8 8.4-1.4 1.2-3.9 3.6-5 5" />
    <path d="M5.5 5.5c1.6 2.6 6.6 7.2 8 8.4 1.4 1.2 3.9 3.6 5 5" transform="translate(0 0) scale(1 -1) translate(0 -24)" />
  </svg>
);

export const MailIcon: Component<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={props.title ? undefined : true}
    {...props}
  >
    {props.title ? <title>{props.title}</title> : null}
    <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75zM4.5 6.75v.511l7.5 4.99 7.5-4.99V6.75" />
  </svg>
);

export const ChatIcon: Component<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={props.title ? undefined : true}
    {...props}
  >
    {props.title ? <title>{props.title}</title> : null}
    <path d="M2.25 12a9.75 9.75 0 0 1 9.75-9.75h.75A9.75 9.75 0 0 1 22.5 12a9.75 9.75 0 0 1-9.75 9.75H12l-4.5 3v-3H4.5A9.75 9.75 0 0 1 2.25 12z" />
  </svg>
);
