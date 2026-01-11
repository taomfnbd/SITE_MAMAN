export const SacrumIcon = (props) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Contours du bassin */}
    <path d="M120 180 C80 160 50 200 60 250 C70 300 110 380 150 420 C180 450 200 450 220 420 C230 400 230 380 256 380 C282 380 282 400 292 420 C312 450 332 450 362 420 C402 380 442 300 452 250 C462 200 432 160 392 180" />
    <path d="M392 180 C392 180 370 140 330 140 C320 140 310 150 310 160 L310 180 C310 180 300 210 280 210 C260 210 250 230 256 240" />
    <path d="M120 180 C120 180 142 140 182 140 C192 140 202 150 202 160 L202 180 C202 180 212 210 232 210 C252 210 262 230 256 240" />
    
    {/* Trous sacrés (simplifiés) */}
    <circle cx="200" cy="250" r="10" fill="currentColor" className="opacity-60" />
    <circle cx="312" cy="250" r="10" fill="currentColor" className="opacity-60" />
    <circle cx="215" cy="290" r="8" fill="currentColor" className="opacity-60" />
    <circle cx="297" cy="290" r="8" fill="currentColor" className="opacity-60" />
    <circle cx="230" cy="330" r="6" fill="currentColor" className="opacity-60" />
    <circle cx="282" cy="330" r="6" fill="currentColor" className="opacity-60" />
    
    {/* Coccyx */}
    <path d="M256 380 L256 400" />
  </svg>
);

export const SpineIcon = (props) => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
    {/* Colonne vertébrale stylisée et courbée */}
    <path d="M256 40 C265 40 275 45 270 60 C265 75 245 80 245 90 C245 100 265 105 275 115 C285 125 285 140 275 150 C265 160 250 165 250 175 C250 185 270 195 280 210 C290 225 285 245 270 260 C255 275 245 290 250 305 C255 320 275 330 280 345 C285 360 275 380 260 400 C245 420 235 440 240 460 L256 480" className="opacity-90"/>
    
    {/* Vertèbres individuelles (formes abstraites le long de la courbe) */}
    <path d="M240 50 L272 50" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
    <path d="M245 90 L275 95" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
    <path d="M250 135 L280 130" stroke="currentColor" strokeWidth="24" strokeLinecap="round" />
    <path d="M245 180 L285 185" stroke="currentColor" strokeWidth="26" strokeLinecap="round" />
    <path d="M240 230 L285 225" stroke="currentColor" strokeWidth="28" strokeLinecap="round" />
    <path d="M245 280 L280 285" stroke="currentColor" strokeWidth="26" strokeLinecap="round" />
    <path d="M250 330 L280 325" stroke="currentColor" strokeWidth="24" strokeLinecap="round" />
    <path d="M240 380 L270 385" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
    <path d="M245 430 L265 425" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
  </svg>
);

export const EarIcon = (props) => (
  <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M129.982 256c0-68.493 56.417-124.032 126.009-124.032 69.592 0 126.009 55.54 126.009 124.032 0 32.551-14.819 62.138-34.982 85.347v.006c-13.918 16.038-23.774 34.026-27.189 53.693l-.439 2.52c-.672 3.864 2.197 7.553 6.111 7.848.423.031.849.049 1.272.049 6.273 0 11.359-5.086 11.359-11.359 0-3.328 1.438-6.319 3.738-8.384 10.686-9.596 17.51-23.518 17.51-38.989 0-28.775-23.325-52.1-52.1-52.1s-52.1 23.325-52.1 52.1c0 6.273-5.086 11.359-11.359 11.359-6.273 0-11.359-5.086-11.359-11.359 0-41.306 33.511-74.818 74.818-74.818 41.306 0 74.818 33.511 74.818 74.818 0 22.846-10.158 43.303-26.068 57.062-8.472 7.327-13.842 17.986-13.842 29.839 0 21.921 17.838 39.759 39.759 39.759 2.583 0 5.105-.246 7.534-.716 38.646-7.464 67.868-41.455 67.868-82.164 0-46.331-38.006-84.053-84.858-84.053-46.852 0-84.858 37.721-84.858 84.053 0 16.486 4.821 31.956 13.149 45.188 3.398 5.4 1.785 12.544-3.615 15.942-5.401 3.398-12.544 1.786-15.942-3.615-10.518-16.711-16.61-36.248-16.61-57.072 0-58.544 48.069-106.132 107.276-106.132 59.207 0 107.276 47.588 107.276 106.132 0 46.541-29.866 86.297-71.189 100.176-3.834 1.288-8.156.402-11.085-2.274-5.321-4.86-13.565-3.328-16.924 3.093-1.464 2.798-1.503 6.068-.113 8.895 12.062 24.52 37.387 41.528 66.505 41.528 41.055 0 74.34-33.285 74.34-74.34 0-41.055-33.285-74.34-74.34-74.34-41.055 0-74.34 33.285-74.34 74.34 0 6.273 5.086 11.359 11.359 11.359 6.273 0 11.359-5.086 11.359-11.359 0-28.532 23.09-51.621 51.621-51.621 28.532 0 51.621 23.09 51.621 51.621 0 10.158-3.007 19.643-8.232 27.604-3.526 5.374-1.954 12.617 3.42 16.143 5.374 3.526 12.617 1.954 16.143-3.42 7.747-11.805 12.207-25.867 12.207-40.927z"/>
  </svg>
);
