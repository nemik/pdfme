import React, { useContext, useRef, useCallback } from 'react';
import { schemaTypes, SchemaForUI } from '@pdfme/common';
import { SidebarProps } from '../index';
import { I18nContext } from '../../../../contexts';

const ErrorLabel = ({ isError, msg }: { isError: boolean; msg: string }) => (
  <span
    style={{ color: isError ? '#ffa19b' : 'inherit', fontWeight: isError ? 'bold' : 'inherit' }}
  >
    {msg}
  </span>
);

const TypeAndKeyEditor = (
  props: Pick<SidebarProps, 'schemas' | 'changeSchemas'> & { activeSchema: SchemaForUI }
) => {
  const { changeSchemas, activeSchema, schemas } = props;
  const i18n = useContext(I18nContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const getHasSameKey = useCallback(() => {
    const schemaKeys = schemas.map((s) => s.key);
    const index = schemaKeys.indexOf(activeSchema.key);
    if (index > -1) {
      schemaKeys.splice(index, 1);
    }

    return schemaKeys.includes(activeSchema.key);
  }, [schemas, activeSchema]);

  const blankKey = !activeSchema.key;
  const hasSameKey = getHasSameKey();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="px-3 pt-2.5 pb-1.5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
          {i18n('type')}
        </label>
        <select
          id="type"
          name="type"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) =>
            changeSchemas([{ key: 'type', value: e.target.value, schemaId: activeSchema.id }])
          }
          value={activeSchema.type}
        >

          {schemaTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-md px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label htmlFor="fieldName" className="block text-xs font-medium text-gray-900">
          {i18n('fieldName')}
          <u style={{ fontSize: '0.7rem' }}>
            (<ErrorLabel msg={i18n('require')} isError={blankKey} />+
            <ErrorLabel msg={i18n('uniq')} isError={hasSameKey} />)
          </u>
        </label>
        <input
          name='fieldName'
          id='fieldName'
          ref={inputRef}
          onChange={(e) =>
            changeSchemas([{ key: 'key', value: e.target.value, schemaId: activeSchema.id }])
          }
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          value={activeSchema.key}
        />
      </div>
    </div>
  );
};

export default TypeAndKeyEditor;
