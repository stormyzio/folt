import { Canvas } from 'canvas';
import { BackgroundBaseColor, BorderStyle, Color, FontResolvable, TextCard } from '../../interface/card.interface';
/**
 * Base Card Parameters
 */
export interface BaseCardParams {
    /**
     * Text above the user's nickname
     */
    mainText?: TextCard;
    /**
     * User's nickname
     */
    nicknameText?: TextCard;
    /**
     * Text under the user's nickname
     */
    secondText?: TextCard;
    /**
     * Background color; Default: '#0CA7FF' | 'waves'
     */
    backgroundColor?: BackgroundBaseColor;
    /**
     * URL to the background image (800x350 px)
     */
    backgroundImgURL?: string;
    /**
     * URL to the avatar user image
     */
    avatarImgURL?: string;
    /**
     * The outline color of the user's avatar; Default: '#0CA7FF'
     */
    avatarBorderColor?: Color;
    /**
     * Border type for avatar ('fill' fits transparent avatars)
     */
    avatarBorderStyle?: BorderStyle;
    /**
     * Default font (applies if a specific font is not selected in the TextCard object); Default: 'Nunito'
     */
    fontDefault?: FontResolvable;
    /**
     * Default text color (applies if a specific text color is not selected in the Text Card object); Default: '#0CA7FF'
     */
    colorTextDefault?: Color;
    /**
     * If my card is custom...
     */
    customLevelCard?: Boolean;
}
type OptionsDraw = {
    /**
     * Objects (name) that will only be drawn
     * @remark only: "background" | "mainText" | "nickname" | "secondText" | "avatarBorder" | "avatar"
     */
    only?: string[];
    /**
     * Sets show, the image size should be resized so that it fits the canvas
     * @remark default 'fill'
     */
    objectFit?: 'fill' | 'cover';
};
/**
 * Base Card Builder
 */
export declare class BaseCardBuilder {
    mainText?: TextCard;
    nicknameText?: TextCard;
    secondText?: TextCard;
    backgroundImgURL?: string;
    backgroundColor: BackgroundBaseColor;
    avatarBorderStyle?: BorderStyle;
    avatarImgURL?: string;
    avatarBorderColor: Color;
    fontDefault: FontResolvable;
    colorTextDefault: Color;
    constructor(params?: BaseCardParams);
    /**
     * Sets the background color of this card (if no background image is selected)
     * @param backgroundColor Background color
     */
    setBackgroundColor(backgroundColor: BackgroundBaseColor): this;
    /**
     * Sets the background image of this card
     * @remark Image size 800x350px
     * @param backgroundImgURL URL to the background image
     */
    setBackgroundImgURL(backgroundImgURL: string): this;
    /**
     * Sets the avatar image of this card
     * @param avatarImgURL URL to the avatar user image
     */
    setAvatarImgURL(avatarImgURL: string): this;
    /**
     * Sets the border color of the avatar of this card
     * @param avatarBorderColor The outline color of the user's avatar
     */
    setAvatarBorderColor(avatarBorderColor: Color): this;
    /**
     * Sets the default font
     * @param fontDefault Default font
     */
    setFontDefault(fontDefault: FontResolvable): this;
    /**
     * Sets the default text color
     * @param colorTextDefault Default text color
     */
    setColorTextDefault(colorTextDefault: Color): this;
    /**
     * Sets the main text (for example, "Welcome")
     * @param mainText Text above the user's nickname
     */
    setMainText(mainText: TextCard): this;
    /**
     * Sets the user's nickname
     * @param nicknameText User's nickname
     */
    setNicknameText(nicknameText: TextCard): this;
    /**
     * Sets the text under the nickname
     * @param secondText Text under the user's nickname
     */
    setSecondText(secondText: TextCard): this;
    /**
     * Draws the content on the created canvas
     * @param ctx The context of the created canvas
     * @param canvasWidth Width of the created canvas
     * @param canvasHeight Height of the created canvas
     * @param options Additional options
     */
    draw(ctx: any, canvasWidth: number, canvasHeight: number, options?: OptionsDraw): Promise<void>;
    /**
     * Builds a Canvas with the specified parameters
     */
    build(options?: OptionsDraw): Promise<Canvas>;
}
export {};
