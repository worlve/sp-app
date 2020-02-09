export class DocumentTitleBuilder {
  rootParts: string[];
  
  constructor(rootParts?: string[]) {
    if (rootParts) {
      this.rootParts = rootParts;
    } else {
      this.rootParts = [];
    }
  }

  buildTitle(parts?: string[]):string {
    let givenParts:string[] = [];
    if (parts) {
      givenParts = parts;
    }
    const allParts = [...givenParts, ...this.rootParts];
    return DocumentTitleBuilder.buildTitleFromParts(allParts);
  }

  private static buildTitleFromParts(parts: string[]):string {
    return parts.join(' | ');
  }
}

export default new DocumentTitleBuilder();
