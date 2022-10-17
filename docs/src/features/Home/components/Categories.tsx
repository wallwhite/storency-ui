import React from 'react';
import contentCategories from '@/configs/content-categories-config.json';
import { Container } from '@/lib/components';
import CategoryItem from '@/features/Home/components/CategoryItem';
import styles from '@/features/Home/styles/Categories.module.scss';

const Categories: React.FC = () => (
    <div className={styles.categories}>
        <Container>
            <ul className={styles.list}>
                {contentCategories.items.map(({ title, description, picture = '', path }) => (
                    <li className={styles.listItem} key={title + description}>
                        <CategoryItem title={title} description={description} picture={picture} path={path} />
                    </li>
                ))}
            </ul>
        </Container>
    </div>
);

export default Categories;
