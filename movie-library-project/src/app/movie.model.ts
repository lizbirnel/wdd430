export class Movie {
  public id: string;
  public title: string;
  public description: string;
  public imageUrl: string;

  constructor(id: string, title: string, desc: string, imageUrl: string) {
    this.id = id;
    this.title = title;
    this.description = desc;
    this.imageUrl = imageUrl;
  }
}
