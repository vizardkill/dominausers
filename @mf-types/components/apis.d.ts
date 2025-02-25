
    export type RemoteKeys = 'components/Header' | 'components/Home' | 'components/Footer';
    type PackageType<T> = T extends 'components/Footer' ? typeof import('components/Footer') :T extends 'components/Home' ? typeof import('components/Home') :T extends 'components/Header' ? typeof import('components/Header') :any;