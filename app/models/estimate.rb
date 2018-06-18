class Estimate < ActiveRecord::Base
  validates :client_id, presence: true
  validates :status, presence: true 
  validates :price_total, presence: true
end
