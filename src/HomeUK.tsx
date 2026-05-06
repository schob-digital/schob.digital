import { HomePage, type HomePageProps } from './HomePage';

export default function HomeUK(props: Omit<HomePageProps, 'language'>) {
  return <HomePage {...props} language="uk" />;
}
