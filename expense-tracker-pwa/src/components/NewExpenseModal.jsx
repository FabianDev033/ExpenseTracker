import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useExpenses } from '../context/ExpensesContext';
import { CATEGORY_NAMES, formatAmount } from '../data/categories';
import '../styles/modal.css';

/** @param {{ onClose: () => void, onSave: (message: string) => void }} props */
export default function NewExpenseModal({ onClose, onSave }) {
  const { addExpense } = useExpenses();
  const dialogRef = useRef(/** @type {HTMLDialogElement | null} */ (null));
  const [error, setError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus();
    };
  }, []);

  /** @param {import('react').FormEvent<HTMLFormElement>} event */
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const rawAmount = String(data.get('amount') || '').trim();
    const amount = Number(rawAmount.replace(',', '.'));
    const category = String(data.get('category') || '');
    const notes = String(data.get('notes') || '').trim();
    if (
      !name ||
      !/^\d+(?:[.,]\d{1,2})?$/.test(rawAmount) ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !CATEGORY_NAMES.includes(/** @type {any} */ (category))
    ) {
      setError(
        'Completá el nombre, un monto mayor a cero (sin separador de miles) y la categoría.',
      );
      return;
    }
    addExpense({
      title: name,
      amount,
      category,
      notes,
    });
    onSave(
      'Gasto registrado: ' + name + ' · ' + formatAmount(amount) + ' · ' + category,
    );
    onClose();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="expense-modal"
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClose={(event) => {
        if (!event.currentTarget.open) onClose();
      }}
    >
      <div className="sheet-handle" aria-hidden="true" />
      <h2 id="modal-title">Nuevo gasto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="expense-name">Nombre del gasto</label>
          <input
            id="expense-name"
            name="name"
            type="text"
            placeholder="Ej. Supermercado"
            required
            maxLength={100}
          />
        </div>
        <div className="form-field">
          <label htmlFor="expense-amount">Monto</label>
          <input
            id="expense-amount"
            name="amount"
            type="text"
            inputMode="decimal"
            placeholder="Ej. 25000"
            required
            maxLength={15}
            aria-describedby="amount-help"
          />
          <p id="amount-help" className="field-help">
            En pesos, sin separador de miles. Podés usar coma para los centavos.
          </p>
        </div>
        <div className="form-field">
          <label htmlFor="expense-category">Categoría</label>
          <select id="expense-category" name="category" defaultValue="" required>
            <option value="" disabled>
              Seleccioná una categoría
            </option>
            {CATEGORY_NAMES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="expense-notes">Notas (opcional)</label>
          <input
            id="expense-notes"
            name="notes"
            type="text"
            placeholder="Ej. Compra semanal"
            maxLength={200}
          />
        </div>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <div className="form-actions">
          <button className="button" type="submit">
            Guardar
          </button>
          <button className="button button-secondary" type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </dialog>,
    document.body,
  );
}
