class Applicant < ApplicationRecord

    # Validations

    validates :first_name,  length: { minimum: 3 }, presence: true
    validates :last_name,   length: { minimum: 3 }, presence: true
    validates :patronymic,  length: { minimum: 3 }, presence: true
    validates :photo_url,   presence: true

    # Associations

    has_many :reservations
    has_many :subject_tests

end
