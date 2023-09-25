import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   html, body, #root, .App{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
   }

   :root {
	--orange: #FE7E02;
	--gradientBegin: #FF6489;
	--gradientEnd: #F9B24E;
}
`;