import React from 'react';

import '../../style.css';

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
    className?: string;

    onClick?: (e: React.MouseEvent) => void;
}

export const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>(
    ({ size, value: Component, color, stroke = 1, onClick, className, ...props }, ref) => {
        const sizePx = `${typeof size === 'string' ? iconSizesMap[size] : size}px`;
        const classes = `TaskanyIconsWrapper${onClick ? ' TaskanyIconsWrapper_hover' : ''} ${className}` as const;

        return (
            <span
                ref={ref}
                className={classes}
                style={{
                    fontSize: sizePx,
                    width: sizePx,
                    height: sizePx,
                    color,
                }}
                onClick={onClick}
                {...props}
            >
                <Component width={sizePx} height={sizePx} strokeWidth={stroke} />
            </span>
        );
    },
);
