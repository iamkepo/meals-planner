/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { Article, CItem } from '@/core/types';
import ArticleHComponent from '@/components/ArticleHComponent';
import { modal } from '@/stores/appStore';
import { useThemeStore } from '@/stores/themeStore';
import AddModalButton from './AddModalButton';

type ItemListProps = {
  label: string;
  items: CItem[];
  articles: Article[];
  findFn: (subId: number) => unknown;
  addFn: (subId: number) => void;
  removeFn: (subId: number) => void;
  onRemove: (subId: number) => void;
};

const ItemList: React.FC<ItemListProps> = ({ label, items, articles,findFn, addFn, removeFn, onRemove }) => {
  const { theme } = useThemeStore();
  const action = (subId: number) => {
    modal.open(
      <ArticleHComponent
        article={articles.find(a => a.id === subId) as Article}
        choose={findFn(subId) != undefined}
        addItem={(id) => {addFn(id); action(id);}}
        removeItem={(id) => {removeFn(id); action(id);}}
      />,
      "xl"
    );
  };
  return (
    items.length > 0 ?
    <ul className="list-group mb-2">
      <li className={`list-group-item text-bg-${theme} d-flex justify-content-between align-items-center`}> 
        {items.length > 1 ? `${label}s` : label}
        <AddModalButton
          label={label}
          items={items}
          articles={articles}
          findFn={findFn}
          addFn={addFn}
          removeFn={removeFn}
        />
      </li>
      {items.map((sub, i) => (
        <li key={i} className={`list-group-item text-bg-${theme}`}>
          <div className="row">
            <div className="col-2">
              <img
                src={articles.find(a => a.id === sub.id)?.img}
                alt={articles.find(a => a.id === sub.id)?.label}
                className="img-fluid rounded"
                onClick={() => action(sub.id)}
              />
            </div>
            <div className="col-10 d-flex justify-content-between align-items-center">
              <span className="fw-bold text-truncate">{articles.find(a => a.id === sub.id)?.label}</span>
              <span className="fs-6 text-small">{(articles.find(a => a.id === sub.id)?.price || 0).toFixed(2)} XOF
                <i className="bi bi-trash text-danger ms-2" onClick={() => onRemove(sub.id)}></i>
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
    : 
    <AddModalButton
      label={label}
      items={items}
      articles={articles}
      findFn={findFn}
      addFn={addFn}
      removeFn={removeFn}
    />
  );
};
export default ItemList;
