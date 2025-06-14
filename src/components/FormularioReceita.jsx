'use client';

import { useState, useEffect } from 'react';
import styles from '../Styles/FormularioReceita.module.css';

// Estado inicial do formulário para facilitar a limpeza
const initialState = {
  nomeCompleto: '',
  dataNascimento: '',
  idade: '',
  saudeOk: false,
  dataExame: '',
  longeODEsferico: '',
  longeODCilindrico: '',
  longeODEixo: '',
  longeODAV: '',
  longeOEEsferico: '',
  longeOECilindrico: '',
  longeOEEixo: '',
  longeOEAV: '',
  pertoODEsferico: '',
  pertoODCilindrico: '',
  pertoODEixo: '',
  pertoODAV: '',
  pertoOEEsferico: '',
  pertoOECilindrico: '',
  pertoOEEixo: '',
  pertoOEAV: '',
};

export default function FormularioReceita() {
  const [formData, setFormData] = useState(initialState);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    if (formData.dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(formData.dataNascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      setFormData((prevData) => ({
        ...prevData,
        idade: idade >= 0 ? idade.toString() : '',
      }));
    } else if (formData.idade !== '') {
      setFormData((prevData) => ({
        ...prevData,
        idade: '',
      }));
    }
  }, [formData.dataNascimento]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/receitas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ type: 'success', message: data.message });
        setTimeout(() => {
          setFormData(initialState);
          setFeedback({ type: '', message: '' });
        }, 3000);
      } else {
        setFeedback({ type: 'error', message: data.message || 'Ocorreu um erro ao salvar a receita.' });
      }
    } catch (error) {
      console.error('ERRO CRÍTICO NA REQUISIÇÃO:', error);
      setFeedback({ type: 'error', message: 'Não foi possível conectar ao servidor. Verifique o console (F12).' });
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Dados do Paciente e Receita</h2>

      <div className={styles.section}>
        <div className={styles.formGroup}>
          <label htmlFor="nomeCompleto">Nome Completo:</label>
          <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="idade">Idade:</label>
            <input type="text" id="idade" name="idade" value={formData.idade} readOnly className={styles.readOnlyInput} />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dataExame">Data do Exame:</label>
            <input type="date" id="dataExame" name="dataExame" value={formData.dataExame} onChange={handleChange} required />
          </div>
          <div className={styles.formGroupCheckbox}>
            <label htmlFor="saudeOk">Saúde OK:</label>
            <input type="checkbox" id="saudeOk" name="saudeOk" checked={formData.saudeOk} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <table className={styles.prescriptionTable}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Esférico</th>
              <th>Cilíndrico</th>
              <th>Eixo</th>
              <th>A/V</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2" data-label="Distância">Para Longe</td>
              <td data-label="Olho">O.D.</td>
              <td data-label="Esférico"><input type="text" name="longeODEsferico" value={formData.longeODEsferico} onChange={handleChange} /></td>
              <td data-label="Cilíndrico"><input type="text" name="longeODCilindrico" value={formData.longeODCilindrico} onChange={handleChange} /></td>
              <td data-label="Eixo"><input type="text" name="longeODEixo" value={formData.longeODEixo} onChange={handleChange} /></td>
              <td data-label="A/V"><input type="text" name="longeODAV" value={formData.longeODAV} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td data-label="Olho">O.E.</td>
              <td data-label="Esférico"><input type="text" name="longeOEEsferico" value={formData.longeOEEsferico} onChange={handleChange} /></td>
              <td data-label="Cilíndrico"><input type="text" name="longeOECilindrico" value={formData.longeOECilindrico} onChange={handleChange} /></td>
              <td data-label="Eixo"><input type="text" name="longeOEEixo" value={formData.longeOEEixo} onChange={handleChange} /></td>
              <td data-label="A/V"><input type="text" name="longeOEAV" value={formData.longeOEAV} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td rowSpan="2" data-label="Distância">Para Perto</td>
              <td data-label="Olho">O.D.</td>
              <td data-label="Esférico"><input type="text" name="pertoODEsferico" value={formData.pertoODEsferico} onChange={handleChange} /></td>
              <td data-label="Cilíndrico"><input type="text" name="pertoODCilindrico" value={formData.pertoODCilindrico} onChange={handleChange} /></td>
              <td data-label="Eixo"><input type="text" name="pertoODEixo" value={formData.pertoODEixo} onChange={handleChange} /></td>
              <td data-label="A/V"><input type="text" name="pertoODAV" value={formData.pertoODAV} onChange={handleChange} /></td>
            </tr>
            <tr>
              <td data-label="Olho">O.E.</td>
              <td data-label="Esférico"><input type="text" name="pertoOEEsferico" value={formData.pertoOEEsferico} onChange={handleChange} /></td>
              <td data-label="Cilíndrico"><input type="text" name="pertoOECilindrico" value={formData.pertoOECilindrico} onChange={handleChange} /></td>
              <td data-label="Eixo"><input type="text" name="pertoOEEixo" value={formData.pertoOEEixo} onChange={handleChange} /></td>
              <td data-label="A/V"><input type="text" name="pertoOEAV" value={formData.pertoOEAV} onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {feedback.message && (
        <div className={feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError}>
          {feedback.message}
        </div>
      )}

      <button type="submit" className={styles.submitButton}>
        Salvar Receita
      </button>
    </form>
  );
}