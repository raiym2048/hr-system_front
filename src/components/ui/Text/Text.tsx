import {classNames, Mods} from '../../../utils/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextStyle {
    TEXT_JOB_SEEKER_VACANCY = 'text_job-seeker_vacancy',
    TASK_NAME_JOB = 'task_name_job',
    MAIN_TITLE = 'main_title',
    CATEGORY_TEXT = 'category_text',
    CENTER_TEXT='center_text'
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    style?: TextStyle;
    list?: string[];
    onClick?:()=>void;
}

export const Text = (props: TextProps) => {
    const {
        className,
        text,
        title,
        style = '',
        list,
        onClick
    } = props;

    const mods: Mods = {
        [cls[style]]: true,
    };

    return (
        <div  className={classNames(cls.Text, mods, [className || ''])}>
            {text && <p className={cls.text}>{text}</p>}
            {title && <p onClick={onClick} className={cls.title}>{title}</p>}
            {list && <ul className={cls.list}>{
                list.map((item, index) => {
                    return <li key={index} className={cls.list_item}>{item}</li>
                })
            }</ul>
            }
        </div>
    );
};
