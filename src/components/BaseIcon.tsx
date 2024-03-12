import React, { useMemo } from 'react';

export const iconSizesMap = {
    xxs: 12,
    xs: 14,
    s: 15,
    m: 32,
    l: 48,
};

export interface BaseIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size: keyof typeof iconSizesMap | number;
    value: React.FC<React.SVGAttributes<SVGElement>>;
    color?: string;
    stroke?: number;
}

const calculateClasses = (map: Record<string, boolean>): string => {
    let classNames = '';

    for (const key in map) {
        if (key in map) {
            if (map[key]) {
                classNames += `${key} `;
            }
        }
    }

    return classNames;
};

export const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>(
    ({ size, value: Component, color, stroke = 1, onClick, className, ...props }, ref) => {
        const sizePx = `${typeof size === 'string' ? iconSizesMap[size] : size}px`;
        const classes = calculateClasses({
            TaskanyIconsWrapper: true,
            TaskanyIconsWrapper_hover: !!onClick,
            ...(className ? { [className]: true } : null),
        });

        const style = useMemo<React.CSSProperties>(() => ({
            '--taskany-icons-font-size': sizePx,
            color,
        }), [color, sizePx]);

        return (
            <span
                ref={ref}
                className={classes}
                style={style}
                onClick={onClick}
                {...props}
            >
                <Component className="TaskanyIconsInner" width="1em" height="1em" strokeWidth={stroke} />
            </span>
        );
    },
);
