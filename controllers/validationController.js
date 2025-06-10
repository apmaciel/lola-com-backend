exports.validateCPF = async (req, res) => {
  try {
    const { cpf } = req.body;
    
    if (!cpf) {
      return res.status(400).json({ 
        success: false,
        error: 'CPF_REQUIRED',
        message: 'CPF is required' 
      });
    }

    const cleaned = cpf.replace(/\D/g, '');
    
    // Basic format validation
    if (cleaned.length !== 11) {
      return res.json({ 
        success: false,
        isValid: false,
        error: 'INVALID_LENGTH',
        message: 'CPF must have 11 digits' 
      });
    }

    // Check for all identical digits
    if (/^(\d)\1{10}$/.test(cleaned)) {
      return res.json({ 
        success: false,
        isValid: false,
        error: 'INVALID_PATTERN',
        message: 'CPF cannot have all identical digits' 
      });
    }

    // First digit validation
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    remainder = remainder === 10 || remainder === 11 ? 0 : remainder;
    if (remainder !== parseInt(cleaned.charAt(9))) {
      return res.json({ 
        success: false,
        isValid: false,
        error: 'INVALID_FIRST_DIGIT',
        message: 'Invalid CPF (first verification digit incorrect)' 
      });
    }

    // Second digit validation
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    remainder = remainder === 10 || remainder === 11 ? 0 : remainder;
    if (remainder !== parseInt(cleaned.charAt(10))) {
      return res.json({ 
        success: false,
        isValid: false,
        error: 'INVALID_SECOND_DIGIT',
        message: 'Invalid CPF (second verification digit incorrect)' 
      });
    }

    return res.json({ 
      success: true,
      isValid: true 
    });
  } catch (error) {
    console.error('Error validating CPF:', error);
    return res.status(500).json({ 
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred while validating CPF' 
    });
  }
};