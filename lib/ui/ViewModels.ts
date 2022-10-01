/// <reference path="../HtmlUtils.ts"/>

namespace ViewModels {
  export interface DataField {
    name: string;
    retrieveChunk(): string;
    requestChunk(): string;
  }

  export type InputType = "text" | "number" | "date";

  export class InputField implements DataField {
    private label: string;
    private type: InputType;

    constructor(fieldName: string, label: string, type: InputType) {
      this.name = fieldName;
      this.label = label;
      this.type = type;
    }

    name: string;
    retrieveChunk(): string {
      return `document.getElementById(\`${this.name}\`).value`;
    }
    requestChunk(): string {
      const escapedName = HtmlUtils.encode(this.name);
      const escapedLabel = HtmlUtils.encode(this.label);
      const escapedType = HtmlUtils.encode(this.type);

      return `
        <div>
            <label for="${escapedName}">${escapedLabel}</label>
            <input type="${escapedType}" id="${escapedName}" name="${escapedName}" value="0" step="0.01">
        </div>
        `;
    }
  }

  export class ChoiceItem {
    value: string;
    label: string;

    constructor(value: string, label: string) {
      this.value = value;
      this.label = label;
    }
  }

  export class ChoiceField implements DataField {
    private label: string;
    private choices: ChoiceItem[];

    constructor(fieldName: string, label: string, choices: ChoiceItem[]) {
      this.name = fieldName;
      this.label = label;
      this.choices = choices;
    }

    name: string;
    retrieveChunk(): string {
      return `document.getElementById(\`${this.name}\`).value`;
    }
    requestChunk(): string {
      const options = this.choices
        .map((val, idx) => ({
          selected: idx === 0 ? " selected" : "",
          value: val,
        }))
        .map(
          ({ selected, value }) =>
            `<option value="${HtmlUtils.encode(value.value)}"${selected}>${HtmlUtils.encode(value.label)}</option>`
        )
        .join("\n");

      return `
        <div>
          <label for="${HtmlUtils.encode(this.name)}">${HtmlUtils.encode(this.label)}</label>
          <select id="${HtmlUtils.encode(this.name)}" required>
            ${options}
          </select>
        </div>
        `;
    }
  }
}
