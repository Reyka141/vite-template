import { render, screen } from '@testing-library/react';
import { Text, TextSize, TextTheme } from './Text';

describe('Text', () => {
    test('рендерится с дефолтными пропсами', () => {
        render(<Text text="Тестовый текст" />);
        expect(screen.getByText('Тестовый текст')).toBeInTheDocument();
    });

    test('рендерится с темой error', () => {
        render(<Text text="Текст ошибки" theme={TextTheme.ERROR} />);
        const element = screen.getByText('Текст ошибки').parentElement;
        expect(element).toHaveClass('error');
    });

    test('рендерится с темой caps', () => {
        render(<Text text="Текст капсом" theme={TextTheme.CAPS} />);
        const element = screen.getByText('Текст капсом').parentElement;
        expect(element).toHaveClass('caps');
    });

    test('рендерится с разными размерами', () => {
        render(<Text text="Большой текст" size={TextSize.LARGE} />);
        expect(screen.getByText('Большой текст')).toHaveClass('large');

        render(<Text text="Маленький текст" size={TextSize.MINI} />);
        expect(screen.getByText('Маленький текст')).toHaveClass('mini');
    });

    test('применяет дополнительный className', () => {
        render(<Text text="Текст с классом" className="customClass" />);
        const element = screen.getByText('Текст с классом').parentElement;
        expect(element).toHaveClass('customClass');
    });

    test('не рендерит параграф если текст не передан', () => {
        const { container } = render(<Text />);
        expect(container.querySelector('p')).not.toBeInTheDocument();
    });
});
