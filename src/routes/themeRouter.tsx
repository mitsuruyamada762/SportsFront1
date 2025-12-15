import { useParams } from 'react-router-dom';
import { NotFoundPage } from '@/theme1/pages';
import { ThemeOnePage } from './themeOnePage';

export const ThemeRouter = () => {
  const { id } = useParams();

  if (id === '1') {
    return <ThemeOnePage />;
  }

  if (id === '2') {
    return <div>It works</div>;
  }

  return <NotFoundPage />;
};

