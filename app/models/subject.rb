class Subject < ApplicationRecord
  belongs_to :subject_category
  belongs_to :language
end
