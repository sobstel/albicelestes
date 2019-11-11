Handler = Proc.new do |req, res|
  res.status = 200
  res['Content-Type'] = 'text/plain'
  res.body = 'ruby test'
end