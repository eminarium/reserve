class Applicant < ApplicationRecord

    # Validations

    validates   :first_name,  
                length: { minimum: 3 }, 
                presence: true,
                message: "Ady hökman girizilmeli..."

    validates   :last_name,   
                length: { minimum: 3 }, 
                presence: true,
                message: "Familiýasy hökman girizilmeli..."

    validates   :patronymic,  
                length: { minimum: 3 }, 
                presence: true,
                message: "Atasynyň ady hökman girizilmeli"

    # Associations

    has_many :reservations
    has_many :subject_tests

end
