export class CreatePostDTO {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly author: string;
    // tslint:disable-next-line: variable-name
    readonly cat_id: number;
}
