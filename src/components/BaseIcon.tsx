import React from 'react';
import styled from 'styled-components';

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

type StyledIconProps = Pick<BaseIconProps, 'onClick' | 'color'> & {
    children: React.ReactNode;

    size?: string;
    forwardRef?: React.Ref<HTMLSpanElement>
}

const StyledIcon = styled(
    ({
        forwardRef,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        color,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        size,
        ...props
    }: StyledIconProps) => <span ref={forwardRef} {...props} />,
)`
    display: inline-block;

    width: ${({ size }) => size};
    height: ${({ size }) => size};
    font-size: ${({ size }) => size};

    color: ${({ color }) => color};

    ${({ onClick }) =>
        onClick &&
        `
            cursor: pointer;
        `}
`;

export const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>(
    ({ size, value: Component, color = 'inherit', stroke = 1, ...props }, ref) => {
        const sizePx = `${typeof size === 'string' ? iconSizesMap[size] : size}px`;

        return (
            <StyledIcon forwardRef={ref} color={color} size={sizePx} {...props}>
                <Component width={sizePx} height={sizePx} strokeWidth={stroke} />
            </StyledIcon>
        );
    },
);
