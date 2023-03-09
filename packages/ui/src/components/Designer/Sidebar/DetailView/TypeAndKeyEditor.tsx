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
    <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-2">
        <label htmlFor="type" className="block text-sm font-medium leading-2 text-gray-900">
          {i18n('type')}
        </label>
        <select
          id="type"
          name="type"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
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
      <div className="sm:col-span-3">
        <label htmlFor="fieldName" className="block text-sm font-medium leading-2 text-gray-900">
          {i18n('fieldName')} <span className='text-xs'>(<ErrorLabel msg={i18n('require')} isError={blankKey} />+<ErrorLabel msg={i18n('uniq')} isError={hasSameKey} />)</span>
        </label>
        <input
          name='fieldName'
          id='fieldName'
          ref={inputRef}
          onChange={(e) =>
            changeSchemas([{ key: 'key', value: e.target.value, schemaId: activeSchema.id }])
          }
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
          value={activeSchema.key}
        />
      </div>
    </div>
  );
};

export default TypeAndKeyEditor;
