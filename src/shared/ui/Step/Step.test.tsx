import { render, screen } from '@testing-library/react';
import { Step, StepItem } from './Step';

describe('Step', () => {
    const mockStep: StepItem = {
        numberOfStep: 1,
        description: 'Тестовое описание',
    };

    test('рендерится корректно с базовыми пропсами', () => {
        render(<Step step={mockStep} />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Тестовое описание')).toBeInTheDocument();
    });

    test('применяет дополнительный className', () => {
        const { container } = render(<Step step={mockStep} className="customClass" />);

        const stepElement = container.firstChild;
        expect(stepElement).toHaveClass('Step', 'customClass');
    });

    test('корректно отображает разные номера шагов', () => {
        const stepTwo: StepItem = {
            numberOfStep: 2,
            description: 'Второй шаг',
        };

        const { rerender } = render(<Step step={mockStep} />);
        expect(screen.getByText('1')).toBeInTheDocument();

        rerender(<Step step={stepTwo} />);
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Второй шаг')).toBeInTheDocument();
    });

    test('номер шага и описание отображаются в правильных контейнерах', () => {
        render(<Step step={mockStep} />);

        const numberElement = screen.getByText('1').parentElement;
        expect(numberElement).toHaveClass('step_number');
    });
});
