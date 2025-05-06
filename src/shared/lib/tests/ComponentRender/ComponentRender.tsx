import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

interface ComponentRenderProps {
    route?: string;
}
export function ComponentRender(component: ReactNode, options: ComponentRenderProps = {}) {
    const { route = '/' } = options;
    return render(<MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>);
}
