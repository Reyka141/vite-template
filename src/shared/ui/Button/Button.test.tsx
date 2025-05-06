import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonTheme } from './types';

describe('Button', () => {
    afterEach(cleanup);

    test('рендерит кнопку с дочерним текстом', () => {
        render(<Button>Тест</Button>);
        expect(screen.getByText('Тест')).toBeInTheDocument();
    });

    test('применяет дополнительный className', () => {
        render(<Button className="custom-class">Тест</Button>);
        expect(screen.getByText('Тест')).toHaveClass('custom-class');
    });

    test('отображает лоадер при isLoading=true', () => {
        render(<Button isLoading>Тест</Button>);
        expect(screen.queryByText('Тест')).not.toBeInTheDocument();
    });

    test('применяет тему PRIMARY', () => {
        render(<Button theme={ButtonTheme.PRIMARY}>Тест</Button>);
        expect(screen.getByRole('button')).toHaveClass('primary');
    });

    test('применяет тему TERTIARY', () => {
        render(<Button theme={ButtonTheme.TERTIARY}>Тест</Button>);
        expect(screen.getByRole('button')).toHaveClass('tertiary');
    });

    test('отключается при disabled=true', () => {
        render(<Button disabled>Тест</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveClass('disabled');
    });
});
