class Applicant < ApplicationRecord

    # Validations

    validates :first_name,  length: { minimum: 3 }, presence: true
    validates :last_name,   length: { minimum: 3 }, presence: true
    validates :patronymic,  length: { minimum: 3 }, presence: true
    validates :photo_url,   presence: true

end
