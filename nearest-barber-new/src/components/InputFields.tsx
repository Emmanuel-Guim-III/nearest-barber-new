import classNames from 'classnames/bind';
import { useField } from 'formik';

type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  id?: string;
};

type CheckboxProps = {
  label: string;
  name: string;
  children: React.ReactNode;
  id?: string;
};

type SelectProps = {
  label: string;
  name: string;
  id?: string;
};

const styles = {
  container: 'flex flex-col gap-1 w-[300px] items-start',
  label: 'ml-[2px] text-brand-light font-bold',
  input: 'rounded-full px-4 py-2 w-full border text-2xl',
  error: 'text-red-600',
};

const cx = classNames.bind(styles);

export const MyTextInput = ({ label, ...props }: TextInputProps) => {
  const [field, meta] = useField(props);

  const hasError = meta.touched && meta.error;

  return (
    <div className={cx('container')}>
      <label
        className={cx('label', hasError && 'text-red-400')}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={cx('input', hasError ? 'border-red-600' : 'border-tertiary')}
        {...field}
        {...props}
      />
      {hasError ? <div className={cx('error')}>{meta.error}</div> : null}
    </div>
  );
};

export const MyCheckbox = ({ children, ...props }: CheckboxProps) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div className='checkbox-input'>
      <label>
        <input type='checkbox' {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ label, ...props }: SelectProps) => {
  const [field, meta] = useField(props);
  return (
    <div className='select-input'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
