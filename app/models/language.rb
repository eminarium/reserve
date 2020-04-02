class Language < ApplicationRecord

    # Validations

    validates   :title, 
                length: { minimum: 2 },
                presence: true,
                message: "Diliň at tarypy hökman girizilmeli..."


    # Associations

    has_many: subjects
end
