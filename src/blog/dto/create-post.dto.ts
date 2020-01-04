export class CreatePostDTO {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly author: string;
    readonly date_posted: Date;
    readonly path: string;
    readonly tags: [string];
}