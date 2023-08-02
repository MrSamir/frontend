
export class LookupModel{
  value: number;
  name: string;
  constructor(value: number, name: string) {
    this.value = value;
    this.name = name;

  }

}
export class LookupwithHintModel{
  value: number;
  name: string;
  hintKey:string;
  constructor(value: number, name: string,hintKey:string) {
    this.value = value;
    this.name = name;
    this.hintKey=hintKey;
  }

}
