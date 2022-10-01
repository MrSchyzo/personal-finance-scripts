/// <reference path="ViewModels.ts"/>

namespace Fragments {
  export function htmlPage(inner: string): string {
    return `
    <!DOCTYPE html>
    <html>
      ${inner}
    </html>
    `;
  }

  export function defaultHead(inner: string): string {
    return `
    <head>
      <title>Modale</title>
      <base target="_top"/>
      ${inner}
    </head>
    `;
  }

  export function htmlStyle(css: string): string {
    return `
    <style>
      ${css}
    </style>
    `;
  }

  export function inputFragment(
    promptTitle: string,
    fields: Map<string, ViewModels.DataField>,
    processorName: string,
    buttonId: string
  ): string {
    const objectFields = Array.from(fields)
      .map(([key, field]) => [key, field.retrieveChunk()])
      .map(([key, value]) => `"${key}": ${value}`)
      .join(",\n");

    const requestFragment = Array.from(fields)
      .map((x) => x[1])
      .map((x) => x.requestChunk())
      .join("\n");

    return `
    <script>
        function onSuccess() {
            google.script.host.close();
        }
  
        function submit() {
          const input = {
            ${objectFields}
          };
          google.script.run
            .withSuccessHandler(onSuccess)
            .${processorName}(input);
        }
        
        function setup() {
            const button = document.getElementById('${buttonId}');
            button.addEventListener("click", submit)
        }
    </script>
    <body onload="setup()">
      <p>
        ${promptTitle}
      </p>
      <form>
        ${requestFragment}
        <div>
          <button id="${buttonId}">Inserisci</button>
        </div>
      </form>
    </body>
    `;
  }
}
