import { HomePage, type HomePageProps } from './HomePage';

export default function HomeEN(props: Omit<HomePageProps, 'language'>) {
  return <HomePage {...props} language="en" />;
}
