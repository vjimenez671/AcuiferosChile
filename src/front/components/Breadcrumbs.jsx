import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

/**
 * Breadcrumbs Component
 * Muestra la navegación de migas de pan (breadcrumbs)
 * 
 * @param {Array} items - Array de objetos con {name, url}
 * Ejemplo: [{name: 'Inicio', url: '/'}, {name: 'Blog', url: '/blog'}]
 */
export const Breadcrumbs = ({ items = [] }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="breadcrumb" className="breadcrumbs-container">
            <ol className="breadcrumbs">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={index}
                            className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                            aria-current={isLast ? 'page' : undefined}
                        >
                            {!isLast && item.url ? (
                                <>
                                    <Link to={item.url} className="breadcrumb-link">
                                        {item.name}
                                    </Link>
                                    <span className="breadcrumb-separator" aria-hidden="true">
                                        <i className="fas fa-chevron-right"></i>
                                    </span>
                                </>
                            ) : (
                                <span className="breadcrumb-current">{item.name}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
