class Applicant < ApplicationRecord


    # DB fields
    
    # first_name    :string
    # last_name     :string
    # patronymic    :string
    # home_phone    :string
    # mobile_phone  :string
    # school_grade  :string
    # age           :date
    # notes         :text
    # user_id       :integer
    

    # Validations

    validates   :first_name, presence: { message: "Ady hökman girizilmeli..." }
    validates   :first_name, length: { minimum: 2, message: "Ady azyndan 3 belgiden ybarat bolmaly..." }

    validates   :last_name, presence: { message: "Familiýasy hökman girizilmeli..." }
    validates   :last_name, length: { minimum: 2, message: "Familiýasy azyndan 3 belgiden ybarat bolmaly..." }

    #validates   :patronymic, presence: { message: "Atasynyň ady hökman girizilmeli..." }
    #validates   :patronymic, length: { minimum: 2, message: "Atasynyň ady azyndan 3 belgiden ybarat bolmaly..." }


    # Associations

    belongs_to  :user

    has_many    :reservations
    has_many    :subject_tests

end
