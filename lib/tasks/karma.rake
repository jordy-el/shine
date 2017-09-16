desc 'Run unit tests on JS code with karma'

task :karma do
  ENV['NODE_ENV'] = 'test'
  system 'yarn run karma start spec/javascript/karma.conf.js --single-run --log-level=error --fail-on-empty-test-suite'
end

task spec: :karma
