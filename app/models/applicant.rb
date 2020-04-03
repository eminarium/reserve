class Applicant < ApplicationRecord


    # DB fields
    
    # first_name    :string
    # last_name     :string
    # patronymic    :string
    # home_phone    :string
    # mobile_phone  :string
    # photo_url     :string
    # birth_date    :date
    # notes         :text
    # user_id       :integer
    

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

    belongs_to  :user

    has_many    :reservations
    has_many    :subject_tests

end
