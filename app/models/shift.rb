class Shift < ApplicationRecord

    # Validations

    validates :title,       length: { minimum: 3 }, presence: true
    validates :start_time,  presence: true
    validates :end_time,    presence: true

    # Associations

    has_many :reservations
end
