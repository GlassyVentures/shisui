import { Styleable } from "~/lib/types";

export const Add = ({ className }: Styleable) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      className={className}
    >
      <path
        d="M8.687.039c-.643.126-1.174.692-1.27 1.35-.02.144-.034 1.396-.034 3.027v2.78l-.092.096-.095.091h-2.78c-1.632 0-2.883.014-3.027.035-.872.123-1.502.967-1.361 1.818a1.619 1.619 0 0 0 1.36 1.346c.148.021 1.35.035 3.027.035h2.781l.095.092.092.095v2.78c0 1.632.014 2.883.035 3.028.123.868.967 1.5 1.814 1.36a1.619 1.619 0 0 0 1.35-1.36c.021-.145.035-1.396.035-3.027v-2.781l.091-.095.095-.092h2.781c1.677 0 2.88-.014 3.027-.035.876-.126 1.501-.963 1.36-1.817a1.619 1.619 0 0 0-1.36-1.347c-.148-.02-1.35-.035-3.027-.035h-2.78l-.095-.091-.092-.095V4.416c0-1.677-.014-2.88-.035-3.027A1.612 1.612 0 0 0 8.687.039Z"
        fill="#EBE1E1"
      />
    </svg>
  );
};