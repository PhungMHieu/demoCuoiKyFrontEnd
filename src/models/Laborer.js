export class Laborer {
  constructor(id, fullName, phoneNumber, status) {
    this.id = id;
    this.key = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.status = status;
  }

  static fromApi(data) {
    if (!data) {
      return null;
    }

    return new Laborer(data.id, data.fullName, data.phoneNumber, data.status);
  }
}