class Language < ApplicationRecord

    # Validations

    validates :title, length: { minimum: 2 } presence: true
    
end
