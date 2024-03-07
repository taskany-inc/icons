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
    value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    color?: string;
    stroke?: number;
}

export const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>(
    ({ size, value: Component, color, stroke = 1, onClick, className, ...props }, ref) => {
        const sizePx = `${typeof size === 'string' ? iconSizesMap[size] : size}px`;
        let classes = 'TaskanyIconsWrapper';

        if (onClick) {
            classes += ' TaskanyIconsWrapper_hover';
        }

        if (className) {
            classes += ` ${className}`;
        }

        const style = useMemo<React.CSSProperties>(() => ({
            fontSize: sizePx,
            width: sizePx,
            height: sizePx,
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
                <Component className="TaskanyIconsInner" width={sizePx} height={sizePx} strokeWidth={stroke} />
            </span>
        );
    },
);
